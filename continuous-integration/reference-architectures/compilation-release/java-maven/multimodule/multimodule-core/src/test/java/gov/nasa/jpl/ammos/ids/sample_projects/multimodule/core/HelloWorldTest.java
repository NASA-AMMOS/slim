package gov.nasa.ammos.ids.sample_projects.multimodule.core;

import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class HelloWorldTest {

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
		String exp_result = "1 2 3 4 5 6 7 8 9 10. ...\n" + 
		                    "Hello World!\n";
		HelloWorld.main(new String[0]);
	    assertEquals(exp_result, outContent.toString());
	}

}
