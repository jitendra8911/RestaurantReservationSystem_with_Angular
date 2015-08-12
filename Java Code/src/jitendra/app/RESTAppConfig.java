package jitendra.app;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/api")
public class RESTAppConfig extends ResourceConfig{

	public RESTAppConfig()
	{
		packages("jitendra.rest");
	}
}
