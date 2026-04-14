const router = require('express').Router();
const ctrl = require('../controllers/discussionController');
const auth = require('../middleware/authenticate');

router.get('/', ctrl.getAllQuestions);
router.post('/', auth, ctrl.createQuestion);
router.delete('/:id', auth, ctrl.deleteQuestion);
router.put('/:id', auth, ctrl.updateQuestion);
router.post('/answer', auth, ctrl.addAnswer);

module.exports = router;