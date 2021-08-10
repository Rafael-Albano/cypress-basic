/// <reference types="cypress" />

describe('Tickets', () => {

    // Faz a visita no site antes de realizar os demais testes.
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    // cy.get - Busca um elemento através de seletores css.
    // .type - Insere um texto.

    it("fills all the text input fields", () => {

        // Tratando campos de inputs;

        const firstName = 'Walmyr';
        const lastName = 'Filho';

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('talkingabouttesting@gmail');
        cy.get('#requests').type('Vegetarian');
        cy.get('#signature').type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        // Tratando campos de select.

        cy.get("#ticket-quantity").select('2');
    });

    it("select vip ticket type", () => {
        // Tratando campos de radio buttons.
    
        cy.get("#vip").check();

    })

    it("selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selects 'friend' and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();

    });
   
    it("has 'TICKETBOX' header's heading", () => {

        // Fazendo verificações
        cy.get("header h1").should("contain", "TICKETBOX"); 
    });

    it("alerts on invalid email", () => {

        /*
            Observação: Alias guarda estado do elemento no momento em que ele 
            é chamado.
        */
        cy.get("#email")
        .as("email") // Definindo um alias !
        .type("talkingabouttesting-gmail.com");

        cy.get("#email.invalid")
        .as("invalidEmail")
        .should("exist");

        cy.get("@email")
        .clear()
        .type("talkingabouttesting@gmail.com")

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {

        const firstName = "Walmyr";
        const lastName = "Filho";
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('talkingabouttesting@gmail.com');
        cy.get("#ticket-quantity").select('2');
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get('#requests').type('IPA beer');
    
        cy.get(".agreement p").should(
            "contain", `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");

    });


    it.only("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "John",
            lastName: "Doe",
            email: "jonh.doe@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

})