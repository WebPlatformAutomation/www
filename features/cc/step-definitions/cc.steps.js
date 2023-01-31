/* eslint-disable no-await-in-loop */
import { Then } from '@cucumber/cucumber';
import { Click, PageElement, By, PageElements } from '@serenity-js/web';
import { actorCalled } from '@serenity-js/core';
// eslint-disable-next-line import/extensions
import localize from '../../support/localize';
// eslint-disable-next-line import/extensions
import { QuizRecommender } from '../page-objects/cc_quizrecommender_page';

Then(/^I select each quiz recommender answer "([^\"]*)"$/, async (answers) => {
   let page = new QuizRecommender();
  // eslint-disable-next-line no-param-reassign
  answers = answers.split('>').map((x) => x.trim());
  console.log(answers);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in answers) {
    let answer = answers[i];
    answer = localize(answer);
    console.log(`Answered: ${answer}`);
    const elem = page.getQuizRecommenderAnswerByText(answer);
    const nextButton = page.getNextButton(i);
    const resultButton = page.getResultButton();

    await actorCalled('I').attemptsTo(Click.on(elem));
    if (i < answers.length - 1) {
      await actorCalled('I').attemptsTo(Click.on(nextButton));
    } else {
      await actorCalled('I').attemptsTo(Click.on(resultButton));
    }
  }
});

Then(/^I should see quiz recommender single result title is "([^\"]*)"$/, async (title) => {
  console.log(title);
});
