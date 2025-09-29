from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    # The line above already gives us /users/me/, so no change is needed here.
    # The below line is just for completeness if you separated them.
    # path('auth/', include('djoser.urls.jwt')), # If you were to use JWT later
    path('api/', include('blockchain.urls')),
]