describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Test User",
      username: "testuser",
      password: "123456",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Log in");
  });

  it("login form can be opened", function () {
    cy.contains("Login").click();
  });

  describe("Login", function () {
    it("user can login", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.contains("Test User logged in");
    });

    it("login fails with incorrect password", function () {
      cy.contains("Login").click();
      cy.get("#username").type("testuser");
      cy.get("#password").type("69696969");
      cy.get("#login-button").click();

      cy.get(".error").contains("Incorrect username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Test User logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "123456" });
    });

    it("A new blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("Blog created by cypress");
      cy.get("#author").type("Author created by cypress");
      cy.get("#url").type("created-by-cypress.com");
      cy.contains("Create blog").click();
      cy.contains(
        "a new blog Blog created by cypress by Author created by cypress has been added"
      );
    });
    describe("When a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          content: {
            title: "Another cypress blog",
            author: "Another cypress author",
            url: "another-cypress.com",
          },
        });
      });

      it("user can like a blog", function () {
        cy.contains("Another cypress blog").as("theBlog");
        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog").should("contain", "hide");
        cy.get("@theBlog").contains("Like").click();
        cy.get("@theBlog").should("contain", "Likes 1");
      });
    });
  });
});
