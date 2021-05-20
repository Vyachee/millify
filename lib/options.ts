/**
 * Options used to configure Millify.
 */
export interface Options {
  /**
   * The number of significant figures.
   */
  precision: number;
  /**
   * The type of decimal marker (e.g. period ".").
   */
  decimalSeparator: string;
  /**
   * Convert units to lower case.
   */
  lowercase: boolean;
  /**
   * Add a space between the number and the unit.
   */
  space: boolean;
  /**
   * A list of units to use.
   */
  units: string[];
}

/**
 * Default options for Millify.
 */
export const defaultOptions: Options = {
  decimalSeparator: ".",
  lowercase: false,
  precision: 2,
  space: false,
  units: [
    "",
    "K", // Thousand
    "M", // Million
    "B", // Billion
    "T", // Trillion
    "P", // Quadrillion
    "E", // Quintillion
  ],
};
