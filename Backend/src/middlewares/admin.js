import UserService from "../services/User-services.js";

async function createAdmin() {
  try {
    const userService = new UserService();
    const admin = {
      email: "jaisondz9360@gmail.com",
      password: "Qwerty123",
      role: "admin",
    };
    const user = await userService.createUser(admin);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

createAdmin();
