/**
 * Sample code -- Replace with your packages, classes and files
 */
package gov.nasa.ammos.ids.slim.sample_projects.multimodule.api;

import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class NumericViewsTest {

	private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
	private final ByteArrayOutputStream errContent = new ByteArrayOutputStream();
	private final PrintStream originalOut = System.out;
	private final PrintStream originalErr = System.err;

	@Before
	public void setUp() throws Exception {
	    System.setOut(new PrintStream(outContent));
	    System.setErr(new PrintStream(errContent));
	}

	@After
	public void tearDown() throws Exception {
		System.setOut(originalOut);
	    System.setErr(originalErr);
	}

	@Test
	public void testcount_printzero() {
		int testval = 0;
		NumericViews.count_print(testval);
	    assertEquals("1 2 3 4 5 6 7 8 9 10. ...\n", outContent.toString());
	}

	@Test
	public void testcount_printfive() {
		int testval = 5;
		NumericViews.count_print(testval);
	    assertEquals("6 7 8 9 10 11 12 13 14 15. ...\n", outContent.toString());
	}

	@Test
	public void testcount_printten() {
		int testval = 10;
		NumericViews.count_print(testval);
	    assertEquals("11 12 13 14 15 16 17 18 19 20. ...\n", outContent.toString());
	}

	@Test
	public void testcount_printminusone() {
		int testval = -1;
		NumericViews.count_print(testval);
	    assertEquals("Nothing!\n", outContent.toString());
	}

}
