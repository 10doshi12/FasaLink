from django.urls import path
from .views import CreateLotView, QueryLotView, LotHistoryView # Import new view

urlpatterns = [
    path('create-lot/', CreateLotView.as_view(), name='create_lot'),
    path('query-lot/<str:lot_id>/', QueryLotView.as_view(), name='query_lot'),
    path('lot-history/', LotHistoryView.as_view(), name='lot_history'), # Add new path
]