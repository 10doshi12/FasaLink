from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# The URL of your running Node.js Fabric service
FABRIC_SERVICE_URL = "http://localhost:3001"

class CreateLotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # 1. Check user permission (only farmers can create lots)
        if request.user.user_type != 'farmer':
            return Response(
                {"error": "Only users with the 'Farmer' role can create lots."},
                status=status.HTTP_403_FORBIDDEN
            )

        # 2. Get data from the frontend request
        lot_data = request.data
        lot_id = lot_data.get('id')
        produce = lot_data.get('produce')
        quantity = lot_data.get('quantity')

        # Here you would also handle off-chain data, like saving an image URL
        # For example: LotMetadata.objects.create(lot_id=lot_id, image_url=...)

        # 3. Prepare data for the Fabric service
        fabric_payload = {
            "id": lot_id,
            "produce": produce,
            "quantity": quantity,
            "farmer": request.user.username # Use the logged-in user's name
        }

        # 4. Make a server-to-server request to the Fabric service
        try:
            response = requests.post(f"{FABRIC_SERVICE_URL}/api/create", json=fabric_payload)
            response.raise_for_status() # Raise an exception for bad status codes

            return Response(
                {"message": "Lot created successfully on the blockchain."},
                status=status.HTTP_201_CREATED
            )
        except requests.exceptions.RequestException as e:
            # Handle potential errors from the Fabric service
            error_detail = e.response.json() if e.response else str(e)
            return Response(
                {"error": "Failed to create lot on the blockchain.", "details": error_detail},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class QueryLotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lot_id, *args, **kwargs):
        try:
            response = requests.get(f"{FABRIC_SERVICE_URL}/api/query/{lot_id}")
            response.raise_for_status()

            on_chain_data = response.json()
            # Here you could combine it with off-chain data from your PostgreSQL DB

            return Response(on_chain_data, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            error_detail = e.response.json() if e.response else str(e)
            return Response(
                {"error": f"Failed to query lot {lot_id}.", "details": error_detail},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class LotHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the username of the currently logged-in user
        current_user = request.user.username

        try:
            # Call the Node.js service's new history endpoint
            response = requests.get(f"{FABRIC_SERVICE_URL}/api/history/{current_user}")
            response.raise_for_status()

            history_data = response.json()
            return Response(history_data, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            error_detail = e.response.json() if e.response else str(e)
            return Response(
                {"error": "Failed to retrieve lot history.", "details": error_detail},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )