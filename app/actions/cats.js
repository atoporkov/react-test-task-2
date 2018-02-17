import axios from 'axios';

import APP_CONFIG from '../config';

// actions const here
export const   FETCH_CAT_FULFILLED_GET = 'FETCH_CATS_FULFILLED_GET',
               FETCH_CAT_FULFILLED_PUT = 'FETCH_CATS_FULFILLED_PUT',
               FETCH_CAT_FULFILLED_POST = 'FETCH_CATS_FULFILLED_POST',
               FETCH_CAT_FULFILLED_DELETE = 'FETCH_CATS_FULFILLED_DELETE',
               FETCH_CAT_REJECTED = 'FETCH_CATS_REJECTED',
               FETCH_CATS_FULFILLED_GET = 'FETCH_CATS_FULFILLED_GET',
               FETCH_CATS_REJECTED = 'FETCH_CATS_REJECTED',
               FETCH_CATS_SORTING = 'FETCH_CATS_SORTING',
               FETCH_CATS_BY_QUERY = 'FETCH_CATS_BY_QUERY';

export const getCats = () =>
    dispatch => {
        axios
            .get(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/cats`)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_CATS_FULFILLED_GET,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_CATS_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const getCatById = (id) =>
    dispatch => {
        axios
            .get(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/cats/${id}`)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_CAT_FULFILLED_GET,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_CAT_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const addCat = (data) =>
    dispatch => {
        axios
            .post(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/cats`, data)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_CAT_FULFILLED_POST,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_CAT_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const updateCat = (id, data) =>
    dispatch => {
        axios
            .put(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/cats/${id}`, data)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_CAT_FULFILLED_PUT,
                                payload: response.data
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_CAT_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const deleteCat = (id) =>
    dispatch => {
        axios
            .delete(`${APP_CONFIG['api']['host']}:${APP_CONFIG['api']['port']}/cats/${id}`)
                .then(
                    response => {
                        dispatch(
                            {
                                type: FETCH_CAT_FULFILLED_DELETE,
                                // hack, json-server DELETE does not return deleted item id. payload: response.data should be below
                                payload: id
                            }
                        );
                    }
                )
                .catch(error => {
                    dispatch(
                        {
                            type: FETCH_CAT_REJECTED,
                            payload: error
                        }
                    );
                })
    }

export const findCat = (payload) =>
    dispatch =>
        dispatch({
            type: FETCH_CATS_BY_QUERY,
            payload
        });

export const sortCats = (payload) =>
    dispatch =>
        dispatch({
            type: FETCH_CATS_SORTING,
            payload
        });
