export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  onSavePhone: (phoneNumber: string) => void,
) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  let result = value;

  // 02로 시작 (서울)
  if (result.startsWith("02")) {
    if (result.length < 3) {
      onSavePhone(result);
      return;
    } else if (result.length < 6) {
      onSavePhone(result.replace(/(02)(\d{0,3})/, "$1-$2"));
      return;
    } else if (result.length < 10) {
      onSavePhone(result.replace(/(02)(\d{3})(\d{0,4})/, "$1-$2-$3"));
      return;
    } else {
      onSavePhone(
        result.slice(0, 10).replace(/(02)(\d{4})(\d{4})/, "$1-$2-$3"),
      );
      return;
    }
  }

  // 0XX(지역번호, 3자리) 또는 050, 070 등
  if (/^0[1-9][0-9]/.test(result)) {
    if (result.length < 4) {
      onSavePhone(result);
      return;
    } else if (result.length < 7) {
      onSavePhone(result.replace(/(0[1-9][0-9])(\d{0,3})/, "$1-$2"));
      return;
    } else if (result.length === 10) {
      // 3-3-4

      onSavePhone(result.replace(/(0[1-9][0-9])(\d{3})(\d{4})/, "$1-$2-$3"));
      return;
    } else if (result.length === 11) {
      // 3-4-4

      onSavePhone(result.replace(/(0[1-9][0-9])(\d{4})(\d{4})/, "$1-$2-$3"));
      return;
    } else if (result.length > 11) {
      onSavePhone(
        result.slice(0, 11).replace(/(0[1-9][0-9])(\d{4})(\d{4})/, "$1-$2-$3"),
      );
      return;
    }
  }

  onSavePhone(result);
};

export const handlePhoneNumberKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  phoneNumber: string,
  onSavePhone: (phoneNumber: string) => void,
) => {
  // 하이픈 바로 뒤에서 백스페이스를 누르면, 하이픈과 그 앞 숫자를 같이 지움
  if (
    e.key === "Backspace" &&
    e.currentTarget.selectionStart === e.currentTarget.selectionEnd &&
    e.currentTarget.selectionStart !== null
  ) {
    const pos = e.currentTarget.selectionStart;
    if (pos > 0 && phoneNumber[pos - 1] === "-") {
      e.preventDefault();
      // 하이픈과 그 앞 숫자 제거
      const newValue = phoneNumber.slice(0, pos - 2) + phoneNumber.slice(pos);
      // setPhoneNumber(newValue);
      // setSignupEmailInfo(prev => ({ ...prev, phoneNumber: newValue }));
      onSavePhone(newValue);
    }
  }
};
