export default function Hello(props) {
  console.log(props);
  const { name, message, phoneno } = props;
  
  return (
    <div>
      <h1>
        {message} {name} {phoneno}
      </h1>
    </div>
  );
  
}