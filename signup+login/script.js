function logOut() {
    document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
    window.location.href = '/log-in'
}