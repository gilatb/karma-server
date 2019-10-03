process.env.NODE_ENV = 'test';

const chai = require('chai');

const { expect } = chai;
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const MockUser = {
  userName: 'Darthvader',
  userPassword: 'darkside',
  currLevel: 0,
  currExp: 0,
  completedActions: [],
};
const MockAction = {
  description: 'Create a new action',
  expPoints: 1,
  difficulty: 1,
  category: 'actions',
};

describe('routes | controllers', () => {
  describe('GET /user:param', () => {
    it('Should get the user Darthvader', (done) => {
      chai.request('http://localhost:3000')
        .get('/user/Darthvader')
        .end((err, res) => {
          should.not.exist(err);
          // res.status.should.eql(200);
          console.log(res.body[0].userName);
          res.body[0].userName.should.eql('Darthvader');
          done();
        });
    });
  });
  const agent = chai.request.agent('http://localhost:3000');
  describe('GET /sign-in', () => {
    it('should sign in with user Darthvader', () => {
      agent
        .post('/sign-in')
        .send(MockUser.username, MockUser.password)
      return agent.get('/user/Darthvader')
        .then((res) => {
          expect(res).to.have.status(200);
          res.body[0].userName.should.eql('Darthvader');
        });
    });
  });
  describe('Cookie: sessionID', () => {
    it('should return the user with session id (sid)', () => {
      agent
        .post('/sign-in')
        .send(MockUser.username, MockUser.password)
        .then((res) => {
          expect(res).to.have.cookie('sid');
        })
        .catch((error) => {
          console.log('    ERROR: ', error.message);
        });
      // The `agent` now has the sessionid cookie saved, and will send it
      // back to the server in the next request:
      return agent.get('/user/Darthvader')
        .then((res) => {
          expect(res).to.have.cookie('sid');
        });
    });
  });
  describe('POST /newUser', () => {
    it('Should create and return a new User', () => {
      agent
        .post('/newUser')
        .send(MockUser)
        .then((res) => {
          expect(res.body === MockUser);
        });
    });
  });
  describe('PUT /user', () => {
    it('Should uptdate the user', () => {
      agent
        .put('/user')
        .send({
          _id: '5d94eaba78b5730022390deb',
          currLevel: 10,
        })
        .then((res) => {
          expect(res.body.currLevel === 10);
        })
        .catch((error) => {
          console.log('    ERROR: ', error.message);
        });
    });
  });
  describe('POST /action', () => {
    it('Should create a new action', () => {
      agent
        .post('/action')
        .send({ MockAction })
        .then((res) => {
          expect(res.body.action === MockAction);
        });
    });
  });
  describe('GET /action', () => {
    it('Should return all the actions ', () => {
      agent
        .get('/actions')
        .then((res) => {
          expect(res).to.have.status(200);
        })
        .catch((error) => {
          console.log('    ERROR: ', error.message);
        });
    });
  });
  agent.close();
});
