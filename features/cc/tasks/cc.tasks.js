import { Ensure, equals } from "@serenity-js/assertions";
import { actorCalled, Duration, Task, Wait } from "@serenity-js/core";
import { Click, isVisible, Press, Scroll, isClickable, Value, PageElement, By } from "@serenity-js/web";
import localize from '../../support/localize';

const ClickAnswer = (answer) =>
    Task.where(`#actor click answer`,
        
                
                    Wait.for(Duration.ofSeconds(10)),
                    //Click.on(page.getQuizRecommenderAnswerByText(answers.split(">")[0].trim())),
                    Click.on(PageElement.located(By.xpath(`//div[@class="quiz-options"]//*[@aria-label="${answer}"]`))),
                
            

           
                Wait.upTo(Duration.ofSeconds(10)).until(PageElement.located(By.css('.quiz-action-container button')), isClickable()),
                Click.on(PageElement.located(By.css('.quiz-action-container button'))),
            
        
    )    

export {ClickAnswer as default};