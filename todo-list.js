import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/polymer/lib/utils/gestures.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

class TodoList extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .task{
          display:flex,
          align-items:center
        }
        paper-input{
          display:input-block
        }
      </style>
      <h2>This is [[prop1]] to be completed</h2>
      <template
        is="dom-repeat"
        items="{{tasks}}"
        as="task"
        filter="isNotCompleted"
        observer="completed"
      >
        <div class="task">
          <paper-checkbox
            checked="{{task.completed}}"
            on-click="checkboxChange"
          />
          <paper-input
            label="task"
            value="{{task.name}}"
            char-counter
            maxlength="10"
            no-label-float
            on-click="textChange"
          />
        </div>
      </template>
      <paper-button on-click="addTask" raised>Add</paper-button>
      <paper-button on-click="resetTask" raised>Reset</paper-button>

      <template
        is="dom-repeat"
        items="{{tasks}}"
        as="task"
        filter="isCompleted"
        observer="completed"
      >
        <div class="task">
          <paper-checkbox checked="{{task.completed}}" disabled />
          <paper-input
            label="task"
            value="{{task.name}}"
            char-counter
            maxlength="10"
            no-label-float
            disabled
          />
        </div>
      </template>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: "Todo List"
      },
      tasks: {
        type: Array,
        value: () => []
      }
    };
  }

  addTask() {
    const newTask = {
      name: "",
      completed: false
    };
    this.push("tasks", newTask);
    this.focus();
  }

  resetTask() {
    this.tasks.length = 0;
  }

  isNotCompleted(task) {
    return !task.completed;
  }

  isCompleted(task) {
    return task.completed;
  }
}
window.customElements.define("todo-list", TodoList);
