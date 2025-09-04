/**
 * 한글 자모를 영문 키보드로 변환하는 유틸리티 함수
 */

// 한글 자모와 영문 키보드 매핑
const HANGUL_TO_ENGLISH: { [key: string]: string } = {
  // 자음
  'ㄱ': 'r', 'ㄲ': 'R', 'ㄴ': 's', 'ㄷ': 'e', 'ㄸ': 'E',
  'ㄹ': 'f', 'ㅁ': 'a', 'ㅂ': 'q', 'ㅃ': 'Q', 'ㅅ': 't',
  'ㅆ': 'T', 'ㅇ': 'd', 'ㅈ': 'w', 'ㅉ': 'W', 'ㅊ': 'c',
  'ㅋ': 'z', 'ㅌ': 'x', 'ㅍ': 'v', 'ㅎ': 'g',
  
  // 모음
  'ㅏ': 'k', 'ㅐ': 'o', 'ㅑ': 'i', 'ㅒ': 'O', 'ㅓ': 'j',
  'ㅔ': 'p', 'ㅕ': 'u', 'ㅖ': 'P', 'ㅗ': 'h', 'ㅘ': 'hk',
  'ㅙ': 'ho', 'ㅚ': 'hl', 'ㅛ': 'y', 'ㅜ': 'n', 'ㅝ': 'nj',
  'ㅞ': 'np', 'ㅟ': 'nl', 'ㅠ': 'b', 'ㅡ': 'm', 'ㅢ': 'ml',
  'ㅣ': 'l',
  
  // 특수문자
  ' ': ' ', '.': '.', ',': ',', '!': '!', '?': '?'
};

/**
 * 한글 문자열을 영문 키보드 입력으로 변환
 * @param hangulText 한글 텍스트
 * @returns 영문 키보드 입력 문자열
 */
export function hangulToEnglish(hangulText: string): string {
  if (!hangulText) return '';
  
  let result = '';
  
  for (let i = 0; i < hangulText.length; i++) {
    const char = hangulText[i];
    
    // 한글 유니코드 범위 확인 (가-힣)
    if (char >= '가' && char <= '힣') {
      // 한글을 자모로 분해
      const decomposed = decomposeHangul(char);
      if (decomposed) {
        result += decomposed;
      } else {
        result += char; // 분해할 수 없는 경우 원본 유지
      }
    } else {
      // 한글이 아닌 경우 매핑 테이블에서 찾거나 원본 유지
      result += HANGUL_TO_ENGLISH[char] || char;
    }
  }
  
  return result;
}

/**
 * 한글 문자를 초성, 중성, 종성으로 분해
 * @param char 한글 문자
 * @returns 분해된 자모 문자열
 */
function decomposeHangul(char: string): string | null {
  const code = char.charCodeAt(0) - 0xAC00;
  
  if (code < 0 || code > 11171) return null; // 한글이 아닌 경우
  
  const initial = Math.floor(code / 588);     // 초성
  const medial = Math.floor((code % 588) / 28); // 중성
  const final = code % 28;                    // 종성
  
  const initialConsonants = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const medialVowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const finalConsonants = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  
  let result = '';
  
  // 초성
  if (initialConsonants[initial]) {
    result += HANGUL_TO_ENGLISH[initialConsonants[initial]] || initialConsonants[initial];
  }
  
  // 중성
  if (medialVowels[medial]) {
    result += HANGUL_TO_ENGLISH[medialVowels[medial]] || medialVowels[medial];
  }
  
  // 종성
  if (final > 0 && finalConsonants[final]) {
    result += HANGUL_TO_ENGLISH[finalConsonants[final]] || finalConsonants[final];
  }
  
  return result;
}

/**
 * 입력된 텍스트가 한글이 포함되어 있는지 확인
 * @param text 확인할 텍스트
 * @returns 한글 포함 여부
 */
export function containsHangul(text: string): boolean {
  return /[가-힣]/.test(text);
}

/**
 * 한글과 영문이 섞인 텍스트를 처리하여 검색에 적합한 문자열 반환
 * @param text 입력 텍스트
 * @returns 검색에 사용할 문자열
 */
export function processSearchText(text: string): string {
  if (!text) return '';
  
  // 한글이 포함된 경우 영문으로 변환
  if (containsHangul(text)) {
    return hangulToEnglish(text);
  }
  
  // 이미 영문인 경우 그대로 반환
  return text;
}
