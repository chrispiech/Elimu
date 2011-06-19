import cgi
import urllib
import os
from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.api import mail

def getFeaturedPrograms() :
	return [['maze', 'Maze'],
			['wordSearch', 'Word Search'],
			['pyramid', 'Pyramid']]

def getMostRecentPrograms() :
	queryString = "SELECT * FROM UserProgram ORDER BY date DESC LIMIT 10";
	programs = db.GqlQuery(queryString)
	return programs
    
class UserProgram(db.Model):
	author = db.StringProperty(multiline=False)
	title = db.StringProperty(multiline=False)
	comment = db.TextProperty()
	code = db.TextProperty()
	date = db.DateTimeProperty(auto_now_add=True)

class MainPage(webapp.RequestHandler):
    def get(self):
		template_values = {
		}

		path = os.path.join(os.path.dirname(__file__), 'webpages/index.html')
		self.response.out.write(template.render(path, template_values))

class Submit(webapp.RequestHandler):
	def post(self):
		code = self.request.get('code')
		f = open('webpages/submit.php')
		self.response.out.write(f.read() % code)

class SubmitResult(webapp.RequestHandler):
	def sendDeployEmail(self, emailAddress, url, title):
		if (emailAddress == None or emailAddress == ''):
			return
		mail.send_mail(sender="stanfordkarel.com <piech@cs.stanford.edu>",
              to=emailAddress,
              subject=title + " has been deployed",
              body="""Your Karel program has been deployed! 

You can now visit it at 
"""+ url+""" 

Enjoy!
The stanfordkarel.com Team
""")

	def get(self):	
		code = self.request.get('code')
		code = urllib.unquote(code)
		title = self.request.get('title')
		author = self.request.get('author')
		comments = self.request.get('comments')
		comments = urllib.unquote(comments)
		program = UserProgram()
		program.code = code
		program.title = title
		program.author = author
		program.comment = comments.replace('\n', '<br/>');
		program.put()
		key = str(program.key())
		url = 'program?id='+key

		emailAddress = self.request.get('email')
		self.sendDeployEmail(emailAddress, url, title)
		self.redirect(url)

class Program(webapp.RequestHandler):
	def idePage(self, title, author, code, comments):
		recents = programs = getMostRecentPrograms()
		featuredPages = getFeaturedPrograms()
		pageNames = []
		for page in featuredPages:
			pageNames.append(page[1])
		template_values = {
			'title':title,
			'author':author,
			'code':code,
			'recents': recents,
			'pageNames':pageNames,
			'comments':comments
		}

		path = os.path.join(os.path.dirname(__file__), 'webpages/deployTemplate.html')
		self.response.out.write(template.render(path, template_values))

	def get(self):
		key = self.request.get('id')
		queryString = 'SELECT * FROM UserProgram where __key__ = KEY(\''+key +'\')'
		programs = db.GqlQuery(queryString);
		for program in programs:
			self.idePage(program.title, program.author, program.code, program.comment)
			return	

class Learn(webapp.RequestHandler):
	def get(self):
		pageIndex = int(self.request.get('pageIndex'))
		
		pages = [
			['welcome', 'Welcome'],
			['world', 'Karel&#39;s World'],
			['commands', 'Commands'],
			['firstProgram', 'First Program'],
			['turnRight', 'Turn Right'],
		    ['newFunctions', 'New Functions'],
			['newspaperKarel', 'Newspaper Karel'],
			['conditionals', 'Conditionals'],
			['treasureHunting', 'Treasure Hunting'],
			['iterative', 'Iterative'],
			['pothole','Road Repair'],
			['while', 'While Loops'],
			['advanced', 'Advanced'],
			['end', 'That&#39;s All!']
		]

		pageNames = []
		for page in pages:
			pageNames.append(page[1])
		
		contentFile = pages[pageIndex][0] + '.html'
		templateValues = {
			'pageNames':pageNames,
			'contentFile':contentFile,
			'backFlag':pageIndex != 0,
			'forwardFlag':pageIndex != len(pages) - 1,
			'backUrl':'learn?pageIndex=' + str(pageIndex - 1),
			'forwardUrl':'learn?pageIndex=' + str(pageIndex + 1)
		}

		path = os.path.join(os.path.dirname(__file__), 'webpages/learnTemplate.html')
		self.response.out.write(template.render(path, templateValues))

class Share(webapp.RequestHandler):
	def get(self):
		pageIndex = int(self.request.get('pageIndex'))
		
		featuredPages = getFeaturedPrograms()

		pageNames = []
		for page in featuredPages:
			pageNames.append(page[1])

		recents = getMostRecentPrograms()
		contentFile = featuredPages[pageIndex][0] + '.html'
		templateValues = {
			'recents': recents,
			'pageNames':pageNames,
			'contentFile':contentFile
		}

		path = os.path.join(os.path.dirname(__file__), 'webpages/shareTemplate.html')
		self.response.out.write(template.render(path, templateValues))
		

application = webapp.WSGIApplication(
                                     [('/', MainPage),
                                      ('/submit', Submit),
                                      ('/submitResult', SubmitResult),
                                      ('/program', Program),
                                      ('/learn', Learn),
                                      ('/share', Share)
                                      ],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
