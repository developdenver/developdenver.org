/* global cy, beforeEach, xdescribe, describe, it */

xdescribe("Registration", () => {
	beforeEach(() => {
		// Reseed database
	});
	describe("Happy paths", () => {
		beforeEach(() => {
			cy.visit("/");
			cy.contains("Register today").click();
			cy.url().should("include", "register");

			cy.get("[name='first-name']").type("Test");
			cy.get("[name='last-name']").type("User");
			cy.get("[name='email']").type("test@user.com");
			cy.get("[name='password']").type("secret");
			cy.get("[name='password-confirmation']").type("secret");
		});
		it("registers a hurried user", () => {
			cy.contains("register").click();
			cy.url().should("contain", "news");
		});
		it("registers a thorough user", () => {
			cy.get("[name='profile-photo']").type("");
			cy.get("[name='bio']").type("");
			cy.get("[name='employer']").type("");
			cy.get("[name='position']").type("");
			cy.get("[name='website']").type("");
			cy.get("[name='github']").type("");
			cy.get("[name='twitter']").type("");

			cy.contains("register").click();
			cy.url().should("contain", "news");
		});
		it("links to the privacy policy", () => {
			cy.contains("Privacy Policy").click();
			cy.url().should("contain", "privacy");
		});
		it("links to the code of conduct", () => {
			cy.contains("Code Of Conduct").click();
			cy.url().should("contain", "code-of-conduct");
		});
	});
	describe("Sad paths", () => {
		beforeEach(() => {
			// cy.visit("/register");
		});

		it("requires all mandatory attributes", () => {
			cy.contains("register").click();
			cy.url().should("include", "register");
			cy.get("[name='first-name']").attr("valid").should("be.false");
			cy.get("[name='last-name']").attr("valid").should("be.false");
			cy.get("[name='email']").attr("valid").should("be.false");
			cy.get("[name='password']").attr("valid").should("be.false");
			cy.get("[name='password-confirmation']").attr("valid").should("be.false");
		});
		it("requires passwords to match", () => {
			cy.get("[name='first-name']").type("Test");
			cy.get("[name='last-name']").type("User");
			cy.get("[name='email']").type("test@user.com");
			cy.get("[name='password']").type("secret");
			cy.get("[name='password-confirmation']").type("not-secret");

			cy.contains("register").click();
			cy.url().should("include", "register");
			cy.get("[name='password']").attr("valid").should("be.false");
			cy.get("[name='password-confirmation']").attr("valid").should("be.false");
		});
		it("requires emails to be unique", () => {
			// Give option to login?
		});
	});
});
