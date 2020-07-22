describe("Bloglist App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:5002/api/testing/reset");
    const user1 = {
      name: "John Doe",
      username: "johndoe",
      password: "secret",
    };
    const user2 = {
      name: "Jane Doe",
      username: "janedoe",
      password: "secret2",
    };
    cy.request("POST", "http://localhost:5002/api/users/", user1);
    cy.request("POST", "http://localhost:5002/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Welcome to BlogList App");
  });

  it("Login form is shown", function () {
    cy.contains("Welcome to BlogList App");
    it("front page can be opened", function () {
      cy.contains("Welcome to BlogList App");
    });
    it("login form can be toggled open", function () {
      cy.contains("Login").click();
    });
  });

  describe("Login", function () {
    it("user can login with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("ashwinibhat");
      cy.get("#password").type("bhagya");
      cy.get("#login-btn").click();
      cy.contains("Ashwini Bhat is logged in");
    });
    it("login fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("ashwinibhat");
      cy.get("#password").type("chethan");
      cy.get("#login-btn").click();
      cy.get(".error").should("contain", "Invalid Credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
      cy.get(".error").should("have.css", "border-color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "Ashwini Bhat is logged in");
    });
  });

  describe("When User 1 logs in", function () {
    beforeEach(function () {
      cy.login({ username: "johndoe", password: "secret" });
    });
    describe("Blog can be created", function () {
      it("a new blog can be created", function () {
        cy.contains("Create Blog").click();
        cy.get("#blog-title").type("Cypress Testing is Cool");
        cy.get("#blog-author").type("Chethan Bhat");
        cy.get("#blog-url").type("www.chethanbhat.com/cypress");
        cy.get("#submit-blog").click();
        cy.contains("Cypress Testing is Cool");
      });
    });
    describe("A single blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress Testing is Cool",
          author: "Jane Doe",
          url: "www.example.com/cypress",
        });
        cy.contains("Cypress Testing is Cool");
      });
      it("A user can like a blog", function () {
        cy.contains("View").click();
        cy.get(".like-blog").click();
        cy.contains("Likes: 1");
      });
      it("A user can delete a blog", function () {
        cy.contains("View").click();
        cy.get(".delete-blog").click();
        cy.should("not.contain", "Cypress Testing is Cool");
      });
    });
    describe("Multiple blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress Testing is Cool",
          author: "John Doe",
          url: "www.example.com/cypress",
          likes: 2,
        });
        cy.createBlog({
          title: "I am a full stack tester",
          author: "Chethan Bhat",
          url: "www.example.com/fullstack-testing/",
          likes: 4,
        });
        cy.createBlog({
          title: "I want to code like Pro",
          author: "Jane Doe",
          url: "www.example.com/jane-pro-testing/",
          likes: 100,
        });
        cy.createBlog({
          title: "Test Blog",
          author: "Test Test",
          url: "www.example.com/test-blog",
          likes: 10,
        });
      });
      it("All blogs are sorted on number of likes", function () {
        cy.get(".blog-likes .likes-count")
          .then(($elements) => {
            return $elements.map((index, html) => Cypress.$(html).text()).get();
          })
          .should("deep.eq", ["100", "10", "4", "2"]);
      });
      it("A user can like a specific blog", function () {
        cy.contains("I want to code like Pro").as("proBlog");
        cy.get("@proBlog").contains("View").click();
        cy.get("@proBlog").parent().find(".like-blog").click();
        cy.get("@proBlog").parent().find("p").should("contain", "Likes: 1");
      });
      it("A user can delete a specific blog", function () {
        cy.contains("Test Blog").as("testBlog");
        cy.get("@testBlog").contains("View").click();
        cy.get("@testBlog").parent().find(".delete-blog").click();
        cy.should("not.contain", "Test Blog");
      });
    });
  });
  describe("When User 2 logs in", function () {
    beforeEach(function () {
      cy.login({ username: "janedoe", password: "secret1" });
      cy.createBlog({
        title: "Cypress Testing is Cool",
        author: "John Doe",
        url: "www.example.com/cypress",
      });
      cy.createBlog({
        title: "I am a full stack tester",
        author: "Chethan Bhat",
        url: "www.example.com/fullstack-testing/",
      });
      cy.createBlog({
        title: "I want to code like Pro",
        author: "Jane Doe",
        url: "www.example.com/jane-pro-testing/",
      });
      cy.createBlog({
        title: "Test Blog",
        author: "Test Test",
        url: "www.example.com/test-blog",
      });
      cy.logout();
      cy.login({ username: "johndoe", password: "secret" });
    });
    it("User 2 can like a specific blog created by User 1", function () {
      cy.contains("I want to code like Pro").as("proBlog");
      cy.get("@proBlog").contains("View").click();
      cy.get("@proBlog").parent().find(".like-blog").click();
      cy.get("@proBlog").parent().find("p").should("contain", "Likes: 1");
    });
    it("User 2 cannot delete any created by User 1", function () {
      cy.contains("Test Blog").as("testBlog");
      cy.get("@testBlog").contains("View").click();
      cy.get("@testBlog").parent().find(".delete-blog").click();
      cy.get("@testBlog").parent().should("contain", "Test Blog");
    });
  });
});
