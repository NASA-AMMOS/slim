/**
 * Sample code -- Replace with your packages, classes and files
 */
package gov.nasa.ammos.ids.slim.sample_projects.simple;

import java.lang.invoke.MethodHandles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {

	private static Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getCanonicalName());

	public static void main(String[] args) {

		int count_start = 0;

		log.info("Starting count. ...");
		count_print(count_start);
		log.info("Finished count. ...");
		System.out.println("Hello World!");

	}

	static void count_print(int in_startpoint) {
		// in_startpoint defaults to 0
		String out = "";

		log.debug("Variable startpoint = '" + String.valueOf(in_startpoint) + "'. ...");
        if (in_startpoint >= 0)
			for (int i = in_startpoint + 1; i <= in_startpoint + 10; i++) {
				out += String.valueOf(i).concat(" ");
			}
		if (out.equals("")) {
			log.debug("Variable out is empty!");
			out = "Nothing!";
		} else {
			out = out.trim().concat(". ...");
		}

		System.out.println(out);

		return;

	}

}
