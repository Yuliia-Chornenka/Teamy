const router = require('express').Router();
const Team = require('../../models/Team');
const User = require('../../models/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/file-upload');
const multer = require('multer');

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
    const mentors = [];

    await Promise.all(modTeam.members.map(async item => {
      const user = await User.findById(item.user_id);

      members.push({
        user_id: item.user_id,
        user_name: item.user_name,
        user_photo: user ? user.photo : '',
      });
    }));

    await Promise.all(modTeam.mentors.map(async item => {
      const user = await User.findById(item.user_id);

      mentors.push({
        user_id: item.user_id,
        user_name: item.user_name,
        user_photo: user ? user.photo : '',
        user_email: user ? user.email : '',
        mark: item.mark,
        comment: item.comment,
      });
    }));

    modTeam.mentors = mentors;
    modTeam.members = members;

    res.status(200).json({
      status: 'Success',
      team: modTeam,
    });
  });
});

// Create team
router.post('/', auth, (req, res) => {
  const { teams } = req.body;

  if (!teams) {
    return res.status(400).json({
      status: 'Teams array missing',
    });
  }

  teams.forEach(async (team, index) => {
    const newTeam = new Team({
      project_id: team.projectId,
      project_name: team.projectName,
      members: team.members,
      mentors: team.mentors,
      name: `Team ${index + 1}`,
    });
  
    await newTeam.save();
  });

  res.status(200).json({
    status: 'Success',
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


/*  Upload images */
router.patch('/:id/images', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndUpdate(id, (error) => {
      if (error) {
        return res.status(500).json({message: 'Failed to find a team'});
      }
    });

    await upload(req, res, function (err) {
      const imgUrl = `https://teamy.s3.amazonaws.com/${req.file}`;

      if (err instanceof multer.MulterError) {
        res.status(413).json('File size must not exceed 1 megabyte');
      } else {
        team.images.push(imgUrl);
        Team.findByIdAndUpdate(id,
          { images: team.images }, { new: true }, (error) => {
            if (error) {
              return res.status(500).json({ message: 'Failed to update' });
            }
          });
        res.send({ image: imgUrl });
      }
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong. Try again later',
      error: e,
    });
  }
});

/*  Upload files */
router.patch('/:id/files', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndUpdate(id, (error) => {
      if (error) {
        return res.status(500).json({message: 'Failed to find a team'});
      }
    });

    await upload(req, res, function (err) {
      const fileUrl = `https://teamy.s3.amazonaws.com/${req.file}`;

      if (err instanceof multer.MulterError) {
        res.status(413).json('File size must not exceed 1 megabyte');
      } else {
        team.files.push(fileUrl);
        Team.findByIdAndUpdate(id,
          { files: team.files }, { new: true }, (error) => {
            if (error) {
              return res.status(500).json({ message: 'Failed to update' });
            }
          });
        res.send({ file: fileUrl });
      }
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong. Try again later',
      error: e,
    });
  }
});

router.patch('/:id/name', auth, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      status: 'Team ID or name missing',
    });
  }

  Team.findByIdAndUpdate(id, { name }, (err, team) => {
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
      status: 'Name changed successfully',
    })
  })
});

router.patch('/:id/links', auth, (req, res) => {
  const { id } = req.params;
  const { links } = req.body;

  if (!id || !links) {
    return res.status(400).json({
      status: 'Team ID or links missing',
    });
  }

  Team.findByIdAndUpdate(id, { links }, (err, team) => {
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
      status: 'Links saved',
    });
  });
});

module.exports = router;
