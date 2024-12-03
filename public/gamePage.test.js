// Test files for functions in gamePage.js //
/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from "vitest"; // Importing modules from vitest. Using a local version of vitest in this directory to test files
import { check, play, check_location } from "./gamePage"; // Importing functions from gamePage.js
//Uncomment export lines at the end of "gamePage.js" and write 'npx vitest' in terminal to run tests//

// Play function test
describe("play function", () => {
  it("should play music when called", () => {   // Mocking audio constructor, since it can't be read by node normally
    const playMock = vi.fn(); // Create a mock for play()
    const audioMock = { play: playMock, loop: true };

    vi.stubGlobal('Audio', vi.fn().mockImplementation(() => audioMock));  //Globally mocking audio constructor

    play();
    expect(Audio).toHaveBeenCalledWith("/Soundfiles/14_GBA_Snow_Land.m4a"); // Check if the Audio constructor called the correct file
    expect(playMock).toHaveBeenCalled();   // Check if play() was called
  });
});

// Check_location test
describe("check_location function", () => {
  it("should play music when gameOver.html is loaded and clicked", () => {
    Object.defineProperty(window, 'location', {  // Mocking window.location.pathname
      value: { pathname: '/gameOver.html' },
      writable: true,
    });

    const playMock = vi.fn(); // Mocking the Audio constructor again
    const audioMock = { play: playMock, loop: true };

    vi.stubGlobal('Audio', vi.fn().mockImplementation(() => audioMock));
    check_location();

    document.dispatchEvent(new MouseEvent("mousedown")); // Simulating a mouse click
    expect(playMock).toHaveBeenCalled();
  });
});

//check function test //
it("check() should return true for correct sequence", () => {
  const playerInput = ["triangle", "square"];
  const sequence = ["triangle", "square"];
  expect(check(playerInput, sequence)).toBe(true); //Expects 'true' to be returned if the player selects the correct sequence of shapes//
});

