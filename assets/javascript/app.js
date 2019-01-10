$(document).ready(function () {
  $("#remaining-time").hide();
  $("#start-button").on('click', trivia.firstQuestion);
  $(document).on('click', '.option', trivia.checkAnswer);
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentQA: 0,
  timer: 20,
  timerOn: false,
  timerId: '',
  reasultID:'',
  questions: {
    q1: 'Which year was the first season in the NFL for the Seattle Seahawks?',
    q2: 'Who was the first Seattle Seahawks head coach?',
    q3: 'Who was the Seahawks leading receiver of all time, who remains ninth in NFL history with 819 pass receptions?',
    q4: 'Which Seahawk was the first draft pick in team history?',
    q5: 'What year did the Seahawks record their first winning season?',
    q6: 'Against which team did the Seahawks record their first-ever regular season win?',
    q7: 'Which former Seahawks head coach was the only coach to take three different teams to the NFL playoffs?',
    q8: 'In which division did the Seahawks play in their NFL debut season of 1976?',
    q9: 'Who was the original majority owner of the Seattle Seahawks?'
  },

  options: {
    q1: ['1984', '1979', '1976', '1982'],
    q2: ['Mike McCormack', 'Jack Patera', 'Don Shula', 'Chuck Knox'],
    q3: ['Steve Largent', 'Bobby Engram', 'Walter Jones', 'Tyler Lockett'],
    q4: ['Jim Zorn', 'Nick Bebout', 'Steve Niehaus', 'John Demarie'],
    q5: ['1976', '1978', '1991', '1985'],
    q6: ['Philadelphia Eagles', 'Pittsburg Steelers', 'Tampa Bay Buccaneers', 'New England Patriots'],
    q7: ['Chuck Knox', 'Dennis Erickson', 'Rom Flores', 'Jack Patera'],
    q8: ['AFC West', 'NFC West', 'AFC North', 'AFC South'],
    q9: ['Paul Allen', 'Herman Sarkowsky', 'Ken Hofmann', 'The Nordstrom family']
  },

  answers: {
    q1: '1976',
    q2: 'Jack Patera',
    q3: 'Steve Largent',
    q4: 'Steve Niehaus',
    q5: '1978',
    q6: 'Tampa Bay Buccaneers',
    q7: 'Chuck Knox',
    q8: 'NFC West',
    q9: 'The Nordstrom family'
  },

  firstQuestion: function () {
    trivia.currentQA = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start-game').hide();
    $('#remaining-time').show();
    trivia.nextQuestion();
  },

  nextQuestion: function () {
    trivia.timer = 10;
    $('#timer').text("Remaining time: " + trivia.timer);
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.outOfTime, 1000);
    }
    if (trivia.currentQA < Object.keys(trivia.questions).length) {
      var questionText = Object.values(trivia.questions)[trivia.currentQA];
        $('#question').text(questionText);
      var questionOptions = Object.values(trivia.options)[trivia.currentQA];
        $.each(questionOptions, function (index, value) {
          $('#options').append($('<button class="option btn">' + value + '</button>'));
      })
    }
    else if (trivia.currentQA === Object.keys(trivia.questions).length) {
      $('#results')
        .html('<h3>Thank you for playing! Your results are below</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>');
      $('#start-game').show();
      $('#game').hide();
    }
  },

  outOfTime: function () {
    if (trivia.timer > -1) {
      $('#timer').text("Remaining time: " + trivia.timer);
      trivia.timer--;
    }
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.removePrevious, 1000);
      $('#results').html('<h3>You are out of time! The correct answer was ' + Object.values(trivia.answers)[trivia.currentQA] + '</h3>');
      $('#game').hide();
      
    }
  },

  checkAnswer: function () {
    var currentAnswer = Object.values(trivia.answers)[trivia.currentQA];
    if ($(this).text() === currentAnswer) {
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.removePrevious, 1000);
      $('#results').html('<h3>Great job! You chose the correct Answer!</h3>');
      $('#game').hide();
    }

    else {
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.removePrevious, 1000);
      $('#results').html('<h3>You chose the incorrect answer. The correct answer is: ' + currentAnswer + '</h3>');
      $('#game').hide();
    }
  },

  removePrevious: function () {
    trivia.currentQA++;
    $('.option').remove();
    $('#results h3').remove();
    $('#game').show();
    trivia.nextQuestion();
  }
}