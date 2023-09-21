namespace api_contact.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public ApiResponse(string message, T data,bool success=true)
        {
            Message = message;
            Data = data;
            Success = success;
        }
    }
}
