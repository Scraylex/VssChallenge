namespace BloxzApi.Exceptions
{
    public class InvalidRequestException : System.Exception
    {
        public InvalidRequestException(string message)
            : base(message)
        {
        }
    }
}
