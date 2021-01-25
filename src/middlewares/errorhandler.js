function errorHandler(err, req, res, next) {
  if (err.status) {
      res.status(err.status).json({ message: err.message });
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
      let errors = [];
      for (let i = 0; i < err.errors.length; i++) {
        if (err.name === "SequelizeUniqueConstraintError") {
          errors.push("The email has already been registered");

        //Admins
        } else if (err.parent.table === "Admins") {
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
        } else if (err.parent.table === "Organizers") {
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
        } else if (err.parent.table === "Customers") {
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
        } else if (err.parent.table === "Events") {
            if (err.errors[i].message === "Title is required") {
              if (!errors.includes("Title is required")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "Event preview is required") {
              if (!errors.includes("Event preview is required")) {
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
            } else if (err.errors[i].message === "Regular capacity cannot be less than 0") {
              if (!errors.includes("Regular capacity must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VIP capacity must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VIP capacity cannot be less than 0") {
              if (!errors.includes("VIP capacity must be numeric")) {
                errors.push(err.errors[i].message);
              }
            } else if (err.errors[i].message === "VVIP capacity must be numeric") {
                errors.push(err.errors[i].message);
            } else if (err.errors[i].message === "VVIP capacity cannot be less than 0") {
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
        } else if (err.parent.table === "Tickets") {
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
            } else if (err.errors[i].message === "Seat is required") {
                errors.push(err.errors[i].message);
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
        } else if (err.parent.table === "Banners") {
            if (err.errors[i].message === "Image url is required") {
              if (!errors.includes("Image url is required")) {
                errors.push(err.errors[i].message);
              }
            }

        //Status
        } else if (err.parent.table === "Statuses") {
          if (err.errors[i].message === "Status name is required") {
            if (!errors.includes("Status name is required")) {
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
