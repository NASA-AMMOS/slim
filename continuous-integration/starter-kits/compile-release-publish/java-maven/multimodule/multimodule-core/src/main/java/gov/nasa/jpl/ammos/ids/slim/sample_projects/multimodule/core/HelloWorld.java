/**
 * Sample code -- Replace with your packages, classes and files
 */
package gov.nasa.ammos.ids.slim.sample_projects.multimodule.core;

import java.lang.invoke.MethodHandles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import gov.nasa.ammos.ids.slim.sample_projects.multimodule.api.NumericViews;

public class HelloWorld {

	private static Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getCanonicalName());

	public static void main(String[] args) {

		int count_start = 0;

		log.info("Starting count. ...");
		NumericViews.count_print(count_start);
		log.info("Finished count. ...");
		System.out.println("Hello World!");

	}

}
