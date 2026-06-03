function Hello2(props){
    const {name,message, phone} = props;
    return <h1>{message}, {name} - Phone: {phone}</h1>;
}

export default Hello2;