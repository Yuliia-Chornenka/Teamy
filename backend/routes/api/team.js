const router = require('express').Router();
const Team = require('../../models/Team');
const User = require('../../models/User');
const auth = require('../middleware/auth');

// Get team object by id
router.get('/:id', auth, (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 'Team ID missing'
    })
  }

  Team.findById(id, async (err, team) => {
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

    // why do i have to use '_doc' to get the object i want? 
    // i dont know what im doing anymore, mongoose is weird
    const modTeam = { ...team }._doc;
    const members = [];

    await Promise.all(modTeam.members.map(async item => {
      const user = await User.findById(item.user_id);

      members.push({
        user_id: item.user_id,
        user_name: item.user_name,
        user_photo: user ? user.photo : '',
      });
    }));

    modTeam.members = members;
    
    res.status(200).json({
      status: 'Success',
      team: modTeam,
    });
  });
});

// Create team
router.post('/', auth, (req, res) => {
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
router.delete('/:id', auth, (req, res) => {
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
router.patch('/:id/member', auth, async (req, res) => {
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
router.delete('/:id/member/:memberId', auth, (req, res) => {
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
router.patch('/:id/history', auth, (req, res) => {
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
