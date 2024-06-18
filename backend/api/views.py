from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework import status

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Updates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an existing note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    if not notes:
        return HttpResponse("No notes found", status=status.HTTP_404_NOT_FOUND)
    serializer = NoteSerializer(notes, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

@api_view(['GET'])
def getNote(request, pk):
    try:
        note = Note.objects.get(id=pk)
    except Note.DoesNotExist:
        return HttpResponse("Note not found", status=status.HTTP_404_NOT_FOUND)
    serializer = NoteSerializer(note, many=False)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError

@api_view(['POST'])
def createNote(request):
    data = request.data

    if 'title' not in data or 'body' not in data:
        return Response({"detail": "Both title and body are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        note = Note.objects.create(
            title=data['title'],
            body=data['body']
        )
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ValidationError as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
def updateNote(request, pk):
    try:
        note = Note.objects.get(id=pk)
    except Note.DoesNotExist:
        return HttpResponse("Note not found", status=status.HTTP_404_NOT_FOUND)
    serializer = NoteSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteNote(request, pk):
    try:
        note = Note.objects.get(id=pk)
    except Note.DoesNotExist:
        return HttpResponse("Note not found", status=status.HTTP_404_NOT_FOUND)
    note.delete()
    return HttpResponse("Note was deleted", status=status.HTTP_204_NO_CONTENT)