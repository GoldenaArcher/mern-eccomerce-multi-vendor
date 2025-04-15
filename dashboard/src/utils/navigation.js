let _navigate = null;

export function setNavigate(fn) {
  _navigate = fn;
}

export function navigate(path, options = { replace: true }) {
  if (_navigate) {
    _navigate(path, options);
  } else {
    console.warn("Navigate not initialized yet");
  }
}
