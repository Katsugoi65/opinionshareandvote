db.runTransaction(async (transaction) => {
  const sfDoc = await transaction.get(pollRef);
  const currentVotes = sfDoc.data().votes || {};
  const currentVotedUsers = sfDoc.data().votedUsers || [];
  
  // 該当の選択肢の得票数を+1し、投票者リストに自身を追加
  transaction.update(pollRef, {
    [`votes.${optionIndex}`]: (currentVotes[optionIndex] || 0) + 1,
    votedUsers: [...currentVotedUsers, userId]
  });
});