export default function ChatMessage(props: any) {
  return (
    <>
      {props.author != localStorage.getItem("nickname") ? (
        <div className="container bg-silver rounded-b-md my-2 drop-shadow-lg">
          <h4>{props.author}</h4>
          <p>{props.message}</p>
        </div>
      ) : (
        <div className="container bg-bermuda rounded-b-md my-2 drop-shadow-lg text-right">
          <h4>Me</h4>
          <p>{props.message}</p>
        </div>
      )}
    </>
  );
}
