import db from '../util/dbConnection.js';

function executeQuery(query) {
  return new Promise((resolve, reject) =>
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
}

function createInvitee(invitee) {
  return executeQuery('INSERT INTO Invitee SET ?', invitee);
}

function getInvitee(invitee_no) {
  return executeQuery('SELECT * FROM Invitee WHERE invitee_no = ?', invitee_no);
}

export { createInvitee, getInvitee };
