import { By, PageElement, PageElements } from "@serenity-js/web";
import { classes } from 'polytype';
import { Section } from '../../page-objects/section';
import { CcBasePage } from './cc_base_page';


/**
 * Quiz Recommender Session v2.1
 */
 export class QuizRecommender extends Section {

  // methods
   /**
   * Click 'nth' Card
   * @param {string} nthCard card number
   */
    getNthFeaturedAppCardButton(nthCard) {
      nthCard = parseInt(nthCard);
      let app_card = `div[data-quiz-wrapper]:not(.hidden) .quiz-options .spectrum-Card:nth-of-type(${nthCard})`;
      return this.displayed$(app_card);
    }

   /**
   * Click 'nth' Card
   * @param {string} answer answer text
   */
    getQuizRecommenderAnswerByText(answer) {
      return PageElement.located(By.xpath(`//div[@class="quiz-options"]//*[@aria-label="${ answer }"]`));
    }

  /**
   * Click next button
   * @param {string} nthAnswer nth answer
   */
    getNextButton(number) {
      return PageElements.located(By.css('.quiz-action-container button')).nth(number);
    }
  
    /**
    * Click next button
   * @param {string} nthAnswer nth answer
   */
    getResultButton() {
      return PageElement.located(By.css('[aria-label="Get your results"]'));
    }

  /**
   * Click 'nth' Card
   * @param {string} nthAnswer nth answer
   */
  clickNthAppRecommenderAnswer(nthAnswer) {
    let nth_answer = `//div[@class="quiz-options"]//*[@aria-label="${ nthAnswer }"]/parent::div[contains(@class, "spectrum-Card")]`;
    this.displayed$(nth_answer).click();
  }

   /**
   * @type {object}
   * @description Get app recommender question
   */
  get questionText() {
    return $(`.recommender-item:not(.hide) .enh-recommender-label`).getText();
  }

  /**
   * @type {object}
   * @description Get app recommender question label
   */
  get questionLabel() {
    return $(`.enh-recommender-pagination-ctr`).getText();
  }

     /**
   * @type {object}
   * @description Get app recommender result title
   */
    get singleRecommendationTitle() {
      return $(`//div[contains(@data-matched-xf, "marquee/marquee/")]//h1`).getText();
    }
}

/**
 * Page class for creativecloud/app-recommender.html page
 */
export class CCQuizRecommenderPage extends classes(
  CcBasePage,
  QuizRecommender,
) {
   //url
   /**
   * @type {string}
   * @description Get the URL path of the App Recommender page
   */
  get urlPath() {
    return '/creativecloud/quiz-recommender.html';
  }
  /**
   * @type {object}
   * @description Get urlQuery 
   */
  get urlQuery() {
    return Object.assign(super.urlQuery, {
      mboxDisable: 1
    });
  }
}
