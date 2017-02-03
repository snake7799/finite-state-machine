class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.states = config.states;
            this.initial = this.state = config.initial;
            this.history = this.future = [];
        }
        else
            throw new Error('Error. Config \'${config}\' doesn\'t passed.');
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state]) {
            this.history.push(this.state);
            this.state = state;
            this.future = [];
        }
        else
            throw new Error('Error. State \'${state}\' doesn\'t exist.');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state].transitions[event])
            this.changeState(this.states[this.state].transitions[event]);
        else
            throw new Error('Error. Event \'${event}\' in current state doesn\'t exist.');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event)
            return Object.keys(this.states);
        else {
            let arrayKeys = [];
            for (let key in this.states)
                if (this.states[key].transitions[event])
                    arrayKeys.push(key);
            return arrayKeys;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 0)
            return false;
        else {
            let prevStep = this.history.pop();
            this.future.push(this.state);
            this.state = prevStep;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.future.length == 0)
            return false;
        else {
            let nextStep = this.future.pop();
            this.history.push(this.state);
            this.state = nextStep;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = this.future.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
