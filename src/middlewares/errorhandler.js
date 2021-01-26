function errorHandler(err, req, res, next) {
  if (err.status) {
      res.status(err.status).json({ message: err.message });
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
      let errors = [];
      const modelName = err.errors[0].instance.constructor.name
      for (let i = 0; i < err.errors.length; i++) {
        if (err.name === "SequelizeUniqueConstraintError") {
          errors.push(err.errors[i].message);

        //Admins
        } else if (modelName === "Admin") {
            if (err.errors[i].message === "Email is required") {
              if (!errors.includes("Email is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Email is invalid") {
                if (!errors.includes("Email is required")) {
                    errors.push(err.errors[i].message);
                }
            } else if (err.errors[i].message === "Password is required") {
              if (!errors.includes("Password is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Password must contain at least 7 characters and maximum 128 characters") {
                if (!errors.includes("Password is required")) {
                    errors.push(err.errors[i].message);
                }
            }

        //Organizers   
        } else if (modelName === "Organizer") {
            if (err.errors[i].message === "Name is required") {
              if (!errors.includes("Name is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Email is required") {
              if (!errors.includes("Email is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Email is invalid") {
                if (!errors.includes("Email is required")) {
                    errors.push(err.errors[i].message);
                }
            } else if (err.errors[i].message === "Password is required") {
              if (!errors.includes("Password is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Password must contain at least 7 characters and maximum 128 characters") {
                if (!errors.includes("Password is required")) {
                    errors.push(err.errors[i].message);
                }
            } else if (err.errors[i].message === "Address is required") {
              if (!errors.includes("Address is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Phone is required") {
              if (!errors.includes("Phone is required")) {
                  errors.push(err.errors[i].message);
              }
            }

        //Customers
        } else if (modelName === "Customer") {
            if (err.errors[i].message === "First name is required") {
              if (!errors.includes("First name is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Email is required") {
              if (!errors.includes("Email is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Email is invalid") {
                if (!errors.includes("Email is required")) {
                    errors.push(err.errors[i].message);
                }
            } else if (err.errors[i].message === "Password is required") {
              if (!errors.includes("Password is required")) {
                  errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Password must contain at least 7 characters and maximum 128 characters") {
                if (!errors.includes("Password is required")) {
                    errors.push(err.errors[i].message);
                }
            }

        //Events
        } else if (modelName === "Event") {
            if (err.errors[i].message === "Title is required") {
              if (!errors.includes("Title is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Date is required") {
              if (!errors.includes("Date is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Date must be greater than today") {
              if (!errors.includes("Date is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Time is required") {
              if (!errors.includes("Time is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Location is required") {
              if (!errors.includes("Location is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Regular capacity must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "Regular capacity must be greater than 0") {
              if (!errors.includes("Regular capacity must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VIP capacity must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VIP capacity must be greater than 0") {
              if (!errors.includes("VIP capacity must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VVIP capacity must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VVIP capacity must be greater than 0") {
              if (!errors.includes("VVIP, capacity must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Regular price must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "Regular price cannot be less than 0") {
              if (!errors.includes("Regular price must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VIP price must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VIP price cannot be less than 0") {
              if (!errors.includes("VIP price must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VVIP price must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VVIP price cannot be less than 0") {
              if (!errors.includes("VVIP price must be numeric")) {
                errors.push(err.errors[i].message);
              }
            }
          
        //Tickets
        } else if (modelName === "Ticket") {
            if (err.errors[i].message === "Class is required") {
              if (!errors.includes("Class is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Class is invalid") {
              if (!errors.includes("class is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Ticket code is required") {
              if (!errors.includes("Ticket code is required")) {
                errors.push(err.errors[i].message);
              }
            // } else if (err.errors[i].message === "Seat is required") {
            //     errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "Status is required") {
              if (!errors.includes("Status is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Status is invalid") {
              if (!errors.includes("Status is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Price must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "Price cannot be less than 0") {
              if (!errors.includes("Price must be numeric.")) {
                errors.push(err.errors[i].message);
              }
            }

        //Banners
        } else if (modelName === "Banner") {
            if (err.errors[i].message === "Image URL is required") {
              if (!errors.includes("Image URL is required")) {
                errors.push(err.errors[i].message);
              }
            }

        //Status
        } else if (modelName === "Status") {
          if (err.errors[i].message === "Status name is required") {
            if (!errors.includes("Status name is required")) {
              errors.push(err.errors[i].message);
            }
          }

        //EventTypes
        } else if (modelName === "EventType") {
          if (err.errors[i].message === "Event type is required") {
            if (!errors.includes("Event type is required")) {
              errors.push(err.errors[i].message);
            }
          }
        }
      } 
      res.status(400).json({ message: errors });
  } else {
      res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
