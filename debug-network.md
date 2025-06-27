
# Debug Network Issues

## Steps to debug the 500 error:

1. **Check browser console** for the detailed logs added to the API
2. **Check browser Network tab** to see the actual request being sent
3. **Verify backend server** is running on port 5001
4. **Check backend logs** for error details

## Common Issues:

### Backend Server
- Is the server running?
- Is it listening on the correct port (5001)?
- Check server logs for error details

### Request Format
- Check if the backend expects different field names
- Verify if `categoria` should be a string or array
- Check if additional fields are required

### CORS Issues
- Ensure backend has CORS enabled for localhost:3000

## Testing the API directly:

```bash
curl -X POST http://localhost:5001/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Test Task",
    "categoria": ["Casa"],
    "descricao": "Test description",
    "concluido": false
  }'
```

## Next Steps:
1. Run the above curl command to test the backend directly
2. Check what format your backend expects
3. Verify the backend is properly handling the request
