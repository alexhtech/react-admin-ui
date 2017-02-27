export default{
    name: "events",
    title: "Events",
    url: "/events",
    actions: {
        create: {
            form: "eventsForm",
            fields: [
                {name: "name", component: "input", title: "Name"},
                {name: "description", component: "input", title: "Desc"}
            ],
            component: null,
            url: ()=>"/events",
        },
        edit: {
            form: "eventsForm",
            fields: [
                {name: "name", component: "material.TextField", hintText: "Name", label: "hide"},
                {name: "description", component: "textarea", title: "Desc"}
            ],
            formFields: [
                {name: "name"},
                {name: "description"},
                {name: "created_by"}
            ],
            component: null,
            url: ({id})=>`/events/${id}`,
            params: {type: "user_event"}
        },
        show: {
            fields: [
                {name: "name", title: "Name"},
            ],
            url: (params)=>(`/events/${params.id}`),
            children: {
                eventChild: {
                    name: "eventChild",
                    label: "Events Children",
                    url: "/events",
                    actions: {
                        create: {
                            form: "eventsForm",
                            fields: [
                                {name: "name", component: "input", title: "Name"},
                                {name: "description", component: "input", title: "Desc"}
                            ],
                            component: null,
                            url: (params, query)=>`/events/${query.id}`,
                        },
                        list: {
                            fields: [
                                {name: "name", title: "Name", style: {width: "600px"}},
                            ],
                            url: "/events",
                            params: {}
                        },
                        show: {
                            fields: [
                                {name: "name", title: "Name"},
                            ],
                            url: (params)=>(`/events/${params.id}`)
                        },

                        edit: {
                            form: "eventsForm",
                            fields: [
                                {name: "name", component: "material.TextField", hintText: "Name", label: "hide"},
                                {name: "description", component: "textarea", title: "Desc"}
                            ],
                            formFields: [
                                {name: "name"},
                                {name: "description"},
                                {name: "created_by"}
                            ],
                            component: null,
                            url: ({id})=>`/events/${id}`,
                            params: {type: "user_event"}
                        }
                    }
                },
                eventChildTest: {
                    name: "eventChildTest",
                    label: "Events Children eventChildTest",
                    url: "/events",
                    actions: {
                        create: {
                            form: "eventsForm",
                            fields: [
                                {name: "name", component: "input", title: "Name"},
                                {name: "description", component: "input", title: "Desc"}
                            ],
                            component: null,
                            url: ()=>"/events",
                        },
                        list: {
                            fields: [
                                {name: "name", title: "Name", style: {width: "600px"}},
                            ],
                            url: "/events",
                            params: {}
                        }
                    }
                },

            }
        },
        list: {
            fields: [
                {name: "name", title: "Name", style: {width: "600px"}},
            ],
            params: {}
        },
        del: {
            url: (params)=>(`/events/${params.id}`)
        }

    }
}