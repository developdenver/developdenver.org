describe("Profile", () => {
	describe("Happy paths", () => {
		beforeEach(() => {
			// Add user to database
			// Log user in
		});
		it("shows all attributes", () => {
			cy.get("[name='first-name']").should("have.text", "Test");
			cy.get("[name='last-name']").should("have.text", "User");
			cy.get("[name='email']").should("have.text", "User");
			cy.get("[name='profile-photo'] > img").attr("src").should("have.text", "https://image.com");
			cy.get("[name='bio']").should("have.text", "Bio");
			cy.get("[name='employer']").should("have.text", "Employer");
			cy.get("[name='position']").should("have.text", "Postion");
			cy.get("[name='website']").should("have.text", "https://website.com");
			cy.get("[name='github']").should("have.text", "https://github.com/github");
			cy.get("[name='twitter']").should("have.text", "https://twitter.com/twitter");
		});
		xit("allows attributes to be edited", () => {
		});
		xit("allows the user to reset their password", () => {
		});
		xit("should not show registration link when logged in", () => {
			cy.contains("register").should("not.exist");
			cy.contains("profile").should("exist");
		});
	});
	xdescribe("Sad paths", () => {
		it("redirects a non-logged in user", () => {
		});
		it("doesn't allow a user to view another user's profile", () => {
		});
		it("should show registration link when not logged in", () => {
			cy.contains("register").should("exist");
			cy.contains("profile").should("not.exist");
		});
		it("doesn't save canceled profile changes");
	});
});
