/**
 * Provided a JSON and a version this script will search inside the JSON for version ranges
 * matching the provided version and then take the corresponding records and "inject" properties inside the build
 * 
 * The JSON format is:
 * "range" - Maven Version Range
 * "values" - map - each key/value pair will be exposed as maven property with ".version" suffix
 *  {
 *           "label1":{
 *               "range":"[6.2.7,6.4.12]",
 *               "values": {
 *                   "some.plugin":"3.2.0",
 *                   "some.other.plugin":"2.1.0"
 *                   },
 *            "label2": {
 *               "range":"[7.0.0,)",
 *               "values": {
 *                   "some.plugin":"4.2.0",
 *                   "some.other.plugin":"4.10.0"
 *                   }
 *            } 
 *  }                 
 */
import groovy.json.JsonSlurper
import org.apache.maven.artifact.versioning.VersionRange
import org.apache.maven.artifact.versioning.DefaultArtifactVersion

// Get the current product version
def pversion = productVerison
def productVersion = new DefaultArtifactVersion(pversion)

// Parse the JSON version matrix
def jsonSlurper = new JsonSlurper()
def versionsJSON = jsonSlurper.parseText(versionMatrixJSON)
def match =
		versionsJSON.find{ vspec, value ->
			def range = VersionRange.createFromVersionSpec(value.range)
			range.containsVersion(productVersion)
		}

if(match != null) {
	println match
	match.value.values.each{ k,v ->
		project.properties.setProperty("$k"+".version", v)
	}
} else {
	throw new IllegalArgumentException("Could not find pluginArtifacts matching provided jira.project.version=$pversion.")
}
