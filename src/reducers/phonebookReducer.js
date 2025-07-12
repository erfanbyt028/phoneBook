export const initialState = {
  contacts: [],
};

export const ADD_CONTACT = "ADD_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";

export function phonebookReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload }],
      };
    }

    case REMOVE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
      };
    }

    case EDIT_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };
    }

    default:
      return state;
  }
}

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const removeContact = (id) => ({
  type: REMOVE_CONTACT,
  payload: id,
});

export const editContact = (id, updates) => ({
  type: EDIT_CONTACT,
  payload: { id, updates },
});
