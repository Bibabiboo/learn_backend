

class ProfileController {

    // [GET] /profile
    profile(req, res) {
        res.render('profile');
    }

    show(req, res) {
        res.send('profile detail');
    }
}

module.exports = new ProfileController ;