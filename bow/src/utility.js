export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  };

/*
* Generate a random user for testing user signup and login
*/
export const randomUserGenerator = (length = 10) => {

    let randomString = "test" + Math.random().toString(16).substr(2, length);

    return {
      username: randomString,
      address: randomString,
      email: randomString + "@gmail.com",
      pwd1 : randomString,
      pwd2: randomString,
    };
}

export const registeredUserGenerator = () => {

  return {
    username: "Chris", 
    address: "1150 high street", 
    email: " chris@mail.com", 
    password: "chrischris"
  };
}