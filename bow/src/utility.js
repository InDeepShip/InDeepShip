export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  };

/*
* Generate a random user for testing user signup and login
*/
export const randomString = (length = 10) => {
  return Math.random().toString(16).substr(2, length);
}

export const randomUserGenerator = (length = 10) => {

    let rdString = "test" + randomString();

    return {
      username: rdString,
      address: rdString,
      email: rdString + "@gmail.com",
      pwd1 : rdString,
      pwd2: rdString,
    };
}

export const registeredUserGenerator = () => {

  return {
    username: "Dave", 
    address: "1150 high street", 
    email: "dave@gmail.com", 
    password: "davedave"
  };
}