const router = require('express').Router();
const Team = require('../../models/Team');

// Get team object by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 'Team ID missing'
    })
  }

  Team.findById(id, (err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo Error',
        err,
      });
    }

    if (!team) {
      return res.status(400).json({
        status: 'Team not found',
      })
    }

    res.status(200).json({
      status: 'Success',
      team,
    });
  });
});

// Create team
router.post('/', (req, res) => {
  const { projectId, members } = req.body;

  if (!projectId || !members) {
    return res.status(400).json({
      status: 'Project ID or members array missing',
    });
  }

  const newTeam = new Team({
    project_id: projectId,
    members,
  });

  newTeam.save((err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo error',
        err,
      });
    }

    res.status(200).json({
      status: 'Success',
      team_id: team._id,
    });
  });
});

// Delete team
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      status: 'Team ID missing',
    });
  }

  Team.findByIdAndDelete(id, (err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo error',
        err,
      });
    }

    if (!team) {
      return res.status(400).json({
        status: 'Team not found',
      });
    }

    res.status(200).json({
      status: 'Success',
    });
  })
});

// Add member to team
router.patch('/:id/member', async (req, res) => {
  const { id } = req.params;
  const { member } = req.body;

  if (!id || !member) {
    return res.status(400).json({
      status: 'Team ID or member missing',
    });
  }

  const memberExists = await Team.findOne({ "members.user_id": member.user_id });
  if (memberExists) {
    return res.status(400).json({
      status: 'User already in this team',
    });
  }

  Team.findByIdAndUpdate(id, { $push: { members: member } }, (err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo error',
        err,
      });
    }

    if (!team) {
      return res.status(400).json({
        status: 'Team not found',
      });
    }

    res.status(200).json({
      status: 'Success',
    });
  });
});


// Delete member from team
router.delete('/:id/member/:memberId', (req, res) => {
  const { id, memberId } = req.params;

  if (!id || !memberId) {
    return res.status(400).json({
      status: 'Team ID or member ID is missing',
    });
  }

  Team.findByIdAndUpdate(id, { $pull: { members: { user_id: memberId } } }, (err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo error',
        err,
      });
    }

    if (!team) {
      return res.status(400).json({
        status: 'Team not found',
      });
    }

    res.status(200).json({
      status: 'Success',
    });
  });
});

// Add message to chat history
router.patch('/:id/history', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!id || !message) {
    return res.status(400).json({
      status: 'Team ID or message missing',
    });
  }

  Team.findByIdAndUpdate(id, { $push: { history: message } }, (err, team) => {
    if (err) {
      return res.status(500).json({
        status: 'Mongo error',
        err,
      });
    }

    if (!team) {
      return res.status(400).json({
        status: 'Team not found',
      });
    }

    res.status(200).json({
      status: 'Success',
    });
  });
});

module.exports = router;
