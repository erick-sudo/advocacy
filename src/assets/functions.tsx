
import jwtDecode from "jwt-decode";

export const utilityFunctions = {
  decodeToken: (token: string) => {
    // Decode a Json Web Token
    try {
      
      return {header: jwtDecode(token, { header: true }), payload: jwtDecode(token) };
    } catch (e) {
      return null;
    }
  },
  splitDateString: (d: string, n: number) => {
    return d
      .split(/[\.T]/)
      .slice(0, n)
      .map((tkn, i) => (
        <span key={i}>
          <span>{tkn}</span>
        </span>
      ));
  },
  snakeCaseToTitleCase: (inputString: string) => {
    return inputString
      .split("_")
      .map((c, i) => capitalize(c))
      .join(" ");
  },
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}
