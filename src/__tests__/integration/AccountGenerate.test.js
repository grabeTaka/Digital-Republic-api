const request = require("supertest");
const server = require("../../index");

describe('Creation of new bank accounts', () => {
  it("Registration of a new customer and their bank account, no account balance", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        cpf: 24135395066,
        name: "Gabriel Frederico Takahashi Vargas"
      })
    
    expect(response.status).toBe(200)
  }); 

  it("Registration of a new customer and their bank account, with account balance", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        cpf: 11203960000,
        name: "Gabriel Frederico Takahashi Vargas",
        balance: 3500
      })
    expect(response.body.balance).toBe(3500);
  });

  it("Try registration of a new customer without cpf", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        name: "Gabriel Frederico Takahashi Vargas"
      })
    expect(response.status).toBe(403);
  });

  it("Try registration of customer with the cpf already registered in the base", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 87962236000,
        name: "Gabriel Frederico Takahashi Vargas"
      }).then(async () => {
        let response = await request(server)
          .post("/account")
          .send({
            cpf: 87962236000,
            name: "Gabriel Frederico Takahashi Vargas"
          })

          expect(response.status).toBe(409);
      })
  });

  it("Try registration of a new customer without name", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        cpf: 86935306078,
      })
    expect(response.status).toBe(403);
  });

  it("Try registration of a new customer with invalid cpf", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        cpf: 23232323232,
      })
    expect(response.status).toBe(403);
  });

  it("Try registration of a new customer with negative balance", async () => {
    const response = await request(server)
      .post("/account")
      .send({
        cpf: 38996197068,
        name: "Gabriel Frederico Takahashi Vargas",
        balance: -1400
      })
    expect(response.status).toBe(400);
  });
});

describe('Account deposits', () => {
  
  it("Account deposit respecting the limit of BRL 2000", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 13325008038,
        name: "João Vargas"
      }).then( async (result) => {

        const response = await request(server)
          .put(`/account/${result.body._id}`)
          .send({
            transaction: 2000
          })      
          expect(response.status).toBe(200);
      })
  }); 

  it("Account deposit not respecting the limit of BRL 2000", async () => {
    depositCustomerTest = await request(server)
      .post("/account")
      .send({
        cpf: 62617603067,
        name: "João Vargas"
      }).then( async (result) => {
        const response = await request(server)
          .put(`/account/${result.body._id}`)
          .send({
            transaction: 3000
          })      
          expect(response.status).toBe(400);
      })
  }); 

  it("Deposit in account with negative value", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 96311942054,
        name: "João Vargas"
      }).then( async (result) => {

        const response = await request(server)
          .put(`/account/${result.body._id}`)
          .send({
            transaction: -3000
          })      
          expect(response.status).toBe(400);
      })
  });
});

describe('Account Transactions', () => {
  
  it("Transaction respecting the limit of BRL 2000", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 53559374030,
        name: "Catatau Vargas",
        balance: 2000
      }).then( async (firstCustomer) => {

        await request(server)
        .post("/account")
        .send({
          cpf: 84609525097,
          name: "Catatau Vargas",
          balance: 2000
        }).then( async (secondCustomer) => {

          const response = await request(server)
            .put(`/account/${firstCustomer.body._id}/transaction/${secondCustomer.body._id}`)
            .send({
              transaction: 2000
            })      
          expect(response.status).toBe(200);
        })  
      })
  }); 

  it("Transaction not respecting the limit of BRL 2000", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 38178988003,
        name: "Catatau Vargas",
        balance: 4000
      }).then( async (firstCustomer) => {

        await request(server)
        .post("/account")
        .send({
          cpf: 22543713042,
          name: "Catatau Vargas",
          balance: 2000
        }).then( async (secondCustomer) => {

          const response = await request(server)
            .put(`/account/${firstCustomer.body._id}/transaction/${secondCustomer.body._id}`)
            .send({
              transaction: 3000
            })      
          expect(response.status).toBe(400);
        })  
      })
  }); 

  it("Transaction in account with negative value", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 37014417070,
        name: "Catatau Vargas",
        balance: 4000
      }).then( async (firstCustomer) => {

        await request(server)
        .post("/account")
        .send({
          cpf: 19382470000,
          name: "Catatau Vargas",
          balance: 2000
        }).then( async (secondCustomer) => {

          const response = await request(server)
            .put(`/account/${firstCustomer.body._id}/transaction/${secondCustomer.body._id}`)
            .send({
              transaction: -1500
            })      
          expect(response.status).toBe(400);
        })  
      })
  });

  it("Transaction with an amount greater than what is available in the account", async () => {
    await request(server)
      .post("/account")
      .send({
        cpf: 14716552020,
        name: "Catatau Vargas",
        balance: 1000
      }).then( async (firstCustomer) => {

        await request(server)
        .post("/account")
        .send({
          cpf: 81607374080,
          name: "Catatau Vargas",
          balance: 2000
        }).then( async (secondCustomer) => {

          const response = await request(server)
            .put(`/account/${firstCustomer.body._id}/transaction/${secondCustomer.body._id}`)
            .send({
              transaction: 2000
            })      
          expect(response.status).toBe(400);
        })  
      })
  }); 
});



