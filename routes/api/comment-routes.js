const router = require('express').Router();
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply 
    } = require('../../controllers/comment-controller');

router
    .route('/:pizzaId/:commentId')
    .put(addReply) // PUT route, instead of a POST, because technically we're not creating a new reply resource
    .delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
