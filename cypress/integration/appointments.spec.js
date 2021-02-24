describe("appointment testing", () => {
  it("should book an interview", () => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    // check page, everything within openning and closing tags
    cy.contains("Monday");
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.request("GET", "/api/debug/reset")
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true })
    // cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Tori Malcolm");
    // cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  })

  it("should cancel an interview", () => {
    cy.request("GET", "/api/debug/reset")
    // eq(0) means first item in the array of elements
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
})

// postgres://rzzjfftjbuqzzz:5543a3effcd87cdc415123e4157ea670b3b9a0b8d016aa3adc6975a88fb60537@ec2-3-209-176-42.compute-1.amazonaws.com:5432/d8sbf55e391i9r
// psql -h localhost -p 5432 -U tetsposyklypxl -d d5paf7gvagjk5u

// username : rzzjfftjbuqzzz:
// password : 5543a3effcd87cdc415123e4157ea670b3b9a0b8d016aa3adc6975a88fb60537
// database : d8sbf55e391i9r
// host : ec2-3-209-176-42.compute-1.amazonaws.com
// psql -h ec2-3-209-176-42.compute-1.amazonaws.com -p 5432 -U rzzjfftjbuqzzz -d d8sbf55e391i9r