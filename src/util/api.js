export async function getEvents(userId, idToken) {
    const response = await fetch("https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events");
    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }
    const data = await response.json();
    let reservedEvents = null;

    if(userId) {
        reservedEvents = await getReservedEvents(userId, idToken);
    }

    return data.documents.map(doc => {
        const eventId = doc.name.split('/').pop();
        let isReserved = false;
        if(userId && reservedEvents && reservedEvents.indexOf(eventId) !== -1) {
            isReserved = true;
        }
        return {
            id: doc.name.split('/').pop(),
            name: doc.fields.name ? doc.fields.name.stringValue : '',
            date: doc.fields.date ? doc.fields.date.stringValue : '',
            venue: doc.fields.venue ? doc.fields.venue.stringValue : '',
            time: doc.fields.time ? doc.fields.time.stringValue : '',
            performer: doc.fields.performer ? doc.fields.performer.stringValue : '',
            description: doc.fields.description ? doc.fields.description.stringValue : '',
            image: doc.fields.image ? doc.fields.image.stringValue : '',
            ref: doc.name,
            isReserved: isReserved,
        }
    });
}

export async function getEvent(id) {
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events/${id}`);
    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }

    const doc = await response.json();
    return {
        id: doc.name.split('/').pop(),
        name: doc.fields.name ? doc.fields.name.stringValue : '',
        date: doc.fields.date ? doc.fields.date.stringValue : '',
        venue: doc.fields.venue ? doc.fields.venue.stringValue : '',
        time: doc.fields.time ? doc.fields.time.stringValue : '',
        performer: doc.fields.performer ? doc.fields.performer.stringValue : '',
        description: doc.fields.description ? doc.fields.description.stringValue : '',
        image: doc.fields.image ? doc.fields.image.stringValue : '',
        ref: doc.name,
    }
}

export async function getUser(id) {
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/users/${id}`);
    if (!response.ok) {
        throw { message: 'Failed to fetch user.', status: 500 };
    }

    const doc = await response.json();
    return {
        id: doc.name.split('/').pop(),
        name: doc.fields.name ? doc.fields.name.stringValue : '',
        email: doc.fields.email ? doc.fields.email.stringValue : '',
        isAdmin: doc.fields.isAdmin ? doc.fields.isAdmin.booleanValue : false,
    }
}

export async function reserveEvent(
    userId,
    username,
    name,
    eventId,
    idToken,
) {
    const data = {
        "fields": {
            "userId": {
                "stringValue": userId
            },
            "username": {
                "stringValue": username
            },
            "name": {
                "stringValue": name
            },
            "eventId": {
                "stringValue": eventId
            },
        }
    };
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events/${eventId}/joined?documentId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }

    const doc = await response.json();
    return {
        id: doc.name.split('/').pop(),
        name: doc.fields.name ? doc.fields.name.stringValue : '',
        date: doc.fields.date ? doc.fields.date.stringValue : '',
        venue: doc.fields.venue ? doc.fields.venue.stringValue : '',
        time: doc.fields.time ? doc.fields.time.stringValue : '',
        performer: doc.fields.performer ? doc.fields.performer.stringValue : '',
        description: doc.fields.description ? doc.fields.description.stringValue : '',
        image: doc.fields.image ? doc.fields.image.stringValue : '',
        ref: doc.name,
    }
}
export async function cancelReservedEvent(
    userId,
    eventId,
    idToken,
) {
    const data = {
        "name": `https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events/${eventId}/joined/${userId}`
    };
    const response = await fetch(data.name, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }
    return true;
}
export async function deleteEvent(
    eventId,
    idToken,
) {
    const data = {
        "name": `https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events/${eventId}`
    };
    const response = await fetch(data.name, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }
    return true;
}

export async function getReservedEvents(userId, idToken) {
    const data = {
        "structuredQuery": {
            "from": [{
                "collectionId": "joined",
                "allDescendants": true
            }],
    
            "where": {
                "fieldFilter": {
                    "field": {
                        "fieldPath": "userId"
                    },
                    "op": "EQUAL",
                    "value": {
                        "stringValue": userId,
                    }
                }
            }
        }
    };

    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents:runQuery`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }

    const docs = await response.json();
    return docs.map(doc => {
        if(doc.document && doc.document.fields && doc.document.fields.eventId) {
            return doc.document.fields.eventId.stringValue;
        }
        return false;
    });
}

export async function getEventAttendees(eventId, idToken) {
    const data = {
        "structuredQuery": {
            "from": [{
                "collectionId": "joined",
                "allDescendants": true
            }],
    
            "where": {
                "fieldFilter": {
                    "field": {
                        "fieldPath": "eventId"
                    },
                    "op": "EQUAL",
                    "value": {
                        "stringValue": eventId,
                    }
                }
            }
        }
    };

    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents:runQuery`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw { message: 'Failed to fetch events.', status: 500 };
    }

    const docs = await response.json();
    return docs.map(val => {
        if(val.document && val.document.fields) {
            const doc = val.document;
            return {
                id: doc.name.split('/').pop(),
                eventId: doc.fields.eventId ? doc.fields.eventId.stringValue : '',
                name: doc.fields.name ? doc.fields.name.stringValue : '',
                userId: doc.fields.userId ? doc.fields.userId.stringValue : '',
                username: doc.fields.username ? doc.fields.username.stringValue : '',
            }
        }
        return false;
    });
}

export async function saveEvent(event, idToken) {
    const data = {
        "fields": {
            "date": {
                "stringValue": event.date
            },
            "name": {
                "stringValue": event.name
            },
            "venue": {
                "stringValue": event.venue
            },
            "time": {
                "stringValue": event.time
            },
            "performer": {
                "stringValue": event.performer
            },
            "image": {
                "stringValue": event.image
            },
            "description": {
                "stringValue": event.description
            },
        }
    };
    let URL = `https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events?documentId=${event.id}`;
    if(!!event.id) {
        URL = `https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/events/${event.id}?updateMask.fieldPaths=date&updateMask.fieldPaths=name&updateMask.fieldPaths=venue&updateMask.fieldPaths=time&updateMask.fieldPaths=performer&updateMask.fieldPaths=image&updateMask.fieldPaths=description`;
    }

    const response = await fetch(URL, {
        method: !!event.id ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${idToken}`, 
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Failed to save event.', status: 500 };
    }
}

export async function userLogin(userData) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMrcN8Hzk_C1TGI6ALaVEmCTm4u8PJL6Y', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Authentication failed!', status: 500 };
    }
    return await response.json();
}

async function createUserData(userId, email, name) {
    const data = {
        "fields": {
            "id": {
                "stringValue": userId
            },
            "email": {
                "stringValue": email
            },
            "name": {
                "stringValue": name
            },
        }
    };
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/acn-assessment/databases/(default)/documents/users?documentId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: 'Failed to create user.', status: 500 };
    }

    return response;
}

export async function userRegister(userData) {
    if (userData.name.length < 3) {
        throw { message: 'Name should contain atleast 3 characters.', status: 422 };
    } else if (userData.password.length < 6) {
        throw { message: 'Password should contain atleast 6 characters.', status: 422 };
    } else if (userData.password !== userData.confirmPassword) {
        throw { message: 'Passwords do not match.', status: 422 };
    }

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMrcN8Hzk_C1TGI6ALaVEmCTm4u8PJL6Y', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw { message: response.error.message, status: 500 };
    }

    const createdData = await response.json();
    createdData["name"] = userData.name;

    await createUserData(createdData.localId, createdData.email, userData.name)

    return createdData;
}
